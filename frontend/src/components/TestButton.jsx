import React, { useState } from 'react';

export default function TestButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/test');
      const text = await res.text();
      console.log('Backend response:', text);
      setResult(text);
    } catch (err) {
      console.error(err);
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'Running...' : 'Run Backend Test'}
      </button>
      {result && <div className="mt-2 text-sm">Result: {result}</div>}
    </div>
  );
}
