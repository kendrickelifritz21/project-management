import { MutableRefObject, useRef } from 'react';
import Input from './Input';
import { ProjectData } from '../App'
import Modal from './Modal';

interface NewProjectProps {
  onAdd: (projectData: ProjectData) => void,
  onCancel: () => void
}

export default function NewProject({ onAdd, onCancel }: NewProjectProps) {
  const modal: HTMLInputElement | any = useRef<HTMLInputElement>(null);
  const title = useRef() as MutableRefObject<HTMLInputElement>;
  const description = useRef() as MutableRefObject<HTMLInputElement>;
  const dueDate = useRef() as MutableRefObject<HTMLInputElement>;

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === '' || 
      enteredDescription.trim() === '' || 
      enteredDueDate.trim() === ''
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bolt text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Please provide a valid value.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button 
            className="text-stone-800 hover:text-stone-950"
            onClick={onCancel}>
            Cancel
          </button>
        </li>
        <li>
          <button 
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleSave}>
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input ref={title} label="Title"/>
        <Input ref={description} label="Description" textarea/>
        <Input type="date" ref={dueDate} label="Due Date"/>
      </div>
    </div>
    </>
  );
}