"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SupabaseTestPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function testConnection() {
    setLoading(true);
    setMessage("Testing connection...");

    // Replace "your_existing_table" with an actual
    // table name from your Supabase project.
    const { error } = await supabase
      .from("your_existing_table")
      .select("*")
      .limit(1);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Connection successful!");
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>PowerMap Supabase Test</h1>

      <button onClick={testConnection} disabled={loading}>
        {loading ? "Testing..." : "Test Connection"}
      </button>

      <p>{message}</p>
    </main>
  );
}