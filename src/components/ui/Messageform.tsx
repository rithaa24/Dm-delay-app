import React, { useState, useEffect } from 'react';
import { Textarea } from './textarea';
import { Input } from './input';
import { Button } from './button';

const Messageform = () => {
  const [message, setMessage] = useState<string>('');
  const [delay, setDelay] = useState<number>(10);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sentMessage, setSentMessage] = useState<string>('');

  // Handler for sending message with delay
  const handleSend = () => {
    setIsSending(true);

    const id = setTimeout(() => {
      setSentMessage(message);
      setMessage('');
      setIsSending(false);
      setTimerId(null);
    }, delay * 1000);

    setTimerId(id);
  };

  // Handler for canceling the send
  const handleCancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
    setIsSending(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border shadow-sm bg-white space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Dm Delay Button</h2>

      <Textarea
        placeholder="Type your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        disabled={isSending}
      />

      <Input
        type="number"
        placeholder="Delay in seconds"
        value={delay}
        onChange={e => setDelay(Number(e.target.value))}
        disabled={isSending}
      />

      {!isSending ? (
        <Button className="w-full" onClick={handleSend}>
          Send with Delay
        </Button>
      ) : (
        <Button className="w-full" variant="destructive" onClick={handleCancel}>
          Cancel Sending...
        </Button>
      )}

      {sentMessage && (
        <div className="bg-green-100 border rounded p-3 text-green-900">
          <p className='font-semibold'>Message Sent</p>
          <p>{sentMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Messageform;
