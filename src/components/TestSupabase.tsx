import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function TestSupabase() {
  const [message, setMessage] = useState('Loading...')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase
        .from('test_table')
        .select('message')
        .limit(1)

      if (error) { setErrorMsg(error.message); return }
      setMessage(data?.[0]?.message ?? 'No rows found')
    })()
  }, [])

  return (
    <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, marginTop: 16 }}>
      <div style={{ fontWeight: 700 }}>Supabase Test</div>
      <div>{errorMsg ? `Error: ${errorMsg}` : message}</div>
    </div>
  )
}
