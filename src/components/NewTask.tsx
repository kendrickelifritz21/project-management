import { ChangeEvent, useState } from 'react';

interface NewTaskProps {
  onAdd: (enteredTask: string) => void
}
export default function NewTask({ onAdd }: NewTaskProps) {
  const [enteredTask, setEnteredTask] = useState<string>('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    onAdd(enteredTask);
    setEnteredTask('');
  }

  return (
    <div className="flex items-center gap-4">
      <input 
        type="text" 
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button 
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}>
          Add Task
      </button>
    </div>
  );
}