import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

// Specify Node.js runtime
export const runtime = 'nodejs';

// Set max duration for upload requests
export const maxDuration = 60; // 60 seconds for uploads

export async function POST(request: Request) {
  try {
    // Start timing for performance tracking
    const startTime = Date.now();
    
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("No file received in request");
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Quick validation checks
    if (file.size > 15 * 1024 * 1024) { // 15MB limit
      return NextResponse.json(
        { error: "File size exceeds the 15MB limit" },
        { status: 400 }
      );
    }

    // Log with better performance info
    console.log(`Processing file: ${file.name} | Type: ${file.type} | Size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);

    // Convert File to ArrayBuffer efficiently
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Create unique filename with organized structure
    const uniqueId = uuidv4();
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    
    // Organize files by date to prevent too many files in one directory
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    // Use structured paths for better organization
    const uploadDirBase = join(process.cwd(), "public/uploads");
    const monthDir = join(uploadDirBase, `${year}-${month}`);
    const filename = `${uniqueId}.${extension}`;
    const filePath = join(monthDir, filename);
    
    // Ensure directory exists with efficient checks
    try {
      // Only create directories if they don't exist
      if (!existsSync(uploadDirBase)) {
        await mkdir(uploadDirBase, { recursive: true });
      }
      
      if (!existsSync(monthDir)) {
        await mkdir(monthDir, { recursive: true });
      }
      
      // Write file with more detailed error handling
      await writeFile(filePath, buffer);
      
      // Calculate performance metrics
      const processingTime = Date.now() - startTime;
      console.log(`File saved successfully: ${filePath} | Processing time: ${processingTime}ms`);
    } catch (writeError) {
      console.error("Error writing file:", writeError);
      return NextResponse.json(
        { error: "Failed to save file. Server storage error." },
        { status: 500 }
      );
    }

    // Return a path that works with the file structure
    const relativePath = `/uploads/${year}-${month}/${filename}`;
    
    return NextResponse.json({
      url: relativePath,
      processingTime: Date.now() - startTime,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 }
    );
  }
} 