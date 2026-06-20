import { NextResponse } from "next/server";

// Helper map matching your current language strings to JDoodle's supported language identifiers
const JDOODLE_LANGUAGE_MAP: Record<
  string,
  { language: string; versionIndex: string }
> = {
  javascript: { language: "nodejs", versionIndex: "5" }, // Node.js v18.x
  typescript: { language: "typescript", versionIndex: "1" }, // TypeScript v5.x
  python: { language: "python3", versionIndex: "5" }, // Python 3.x
  java: { language: "java", versionIndex: "4" }, // JDK 17
  go: { language: "go", versionIndex: "4" }, // Go v1.19
  rust: { language: "rust", versionIndex: "4" }, // Rust v1.68
  cpp: { language: "cpp17", versionIndex: "1" }, // C++ 17 GCC
  csharp: { language: "csharp", versionIndex: "4" }, // Mono C#
  ruby: { language: "ruby", versionIndex: "4" }, // Ruby v3.x
  swift: { language: "swift", versionIndex: "3" }, // Swift v5.x
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const targetLanguage = body.language;
    const userCode = body.files[0]?.content || "";

    const jdoodleConfig = JDOODLE_LANGUAGE_MAP[targetLanguage];

    if (!jdoodleConfig) {
      return NextResponse.json(
        { message: `Language ${targetLanguage} is not supported on JDoodle.` },
        { status: 400 },
      );
    }

    // Hit the JDoodle Compiler execute endpoint securely from the server side
    const response = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
        script: userCode,
        language: jdoodleConfig.language,
        versionIndex: jdoodleConfig.versionIndex,
      }),
    });

    const result = await response.json();

    // Map JDoodle's native execution response back into the Piston structure your frontend Zustand store expects!
    const isError =
      result.statusCode !== 200 ||
      result.output?.toLowerCase().includes("error");

    const mockPistonResponse = {
      run: {
        code: isError ? 1 : 0,
        output: result.output || "Code executed successfully with no output.",
        stderr: isError ? result.output : "",
      },
    };

    return NextResponse.json(mockPistonResponse);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Server proxy execution error:", error);
    return NextResponse.json(
      { message: "Server failed to process code execution: " + error.message },
      { status: 500 },
    );
  }
}
