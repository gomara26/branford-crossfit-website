import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("No file received in request");
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    console.log("Received file:", file.name, "Type:", file.type, "Size:", file.size);

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Create unique filename
    const uniqueId = uuidv4();
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${uniqueId}.${extension}`;
    
    // Define uploads directory path
    const uploadsDir = join(process.cwd(), "public/uploads");
    const path = join(uploadsDir, filename);

    console.log("Saving file to:", path);

    // Ensure the uploads directory exists
    try {
      // Check if directory exists, create if it doesn't
      if (!existsSync(uploadsDir)) {
        console.log("Creating uploads directory:", uploadsDir);
        await mkdir(uploadsDir, { recursive: true });
      }
      
      // Write the file
      await writeFile(path, buffer);
      console.log("File saved successfully");
    } catch (writeError) {
      console.error("Error writing file:", writeError);
      return NextResponse.json(
        { error: "Failed to save file. Check server logs for details." },
        { status: 500 }
      );
    }

    // Return the URL
    return NextResponse.json({
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 }
    );
  }
} 