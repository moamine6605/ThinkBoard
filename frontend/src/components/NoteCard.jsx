import { PenSquare, Trash2Icon } from 'lucide-react'
import api from '../lib/axios.js'
import { Link } from 'react-router'
import formatDate from '../lib/utils.js'
import toast from 'react-hot-toast'

function NoteCard({note, setNotes}) {

    const handelDelete = async (e, id) => {
        e.preventDefault();
        try {
            await api.delete(`/notes/${id}`);
            setNotes(prev=>prev.filter(note=>note._id !== id))
            toast.success("note deleted");
        } catch (error) {
            console.error(error.message)
        } finally {
        }
    }
    return (
        <>
            <Link to={`/note/${note.id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9d]">
                <div className='card-body'>
                    <h3 className='card-title text-base-content'>{note.title}</h3>
                    <p className='card-actions justify-between items-center'>{note.content}</p>
                    <div className='card-actions justify-between items-center mt-4'>
                        <span className='text-sm text-base-content/60'>
                            {formatDate(new Date(note.createdAt))}
                        </span>
                        <div className='flex items-center gap-1'>
                            <PenSquare className='size-4'/>
                            <button onClick={(e) => handelDelete(e, note._id)} className='btn btn-ghost btn-xs text-error'>
                                <Trash2Icon className='size-4'/>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default NoteCard
