import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

function NoteDetailPage() {
    const [note, setNote] = useState({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const res = await api.delete(`/notes/${id}`);
            toast.success("note deleted");
            navigate('/')
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleSave = async () => {
        try {
            setSaving(prev=>!prev)
            const res = await api.put(`/notes/${id}`, {title: note.title, content: note.content});
            toast.success("note updated");
            navigate('/')
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=> {
        const fetchNote = async () => {
            try {
                setLoading(prev=>!prev)
                const res = await api.get(`/notes/${id}`);
                setNote(res.data)
            } catch (error) {
                console.error(error.message)
            } finally {
                setLoading(prev=>!prev)
            }
        }

        fetchNote();
    }, [id])

    if(loading) {
        return (
            <div className='min-h-screen bg-base-200 flex items-center justify-center'>
                <LoaderIcon className="animate-spin size-10" />
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className="max-w-2xl mx-auto">

                    <div className='flex items-center justify-between mb-6'>
                        <Link to={"/"} className='btn btn-primary'>
                            <ArrowLeftIcon className='h-5 w-5' />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className='btn btn-error btn-outline'>
                            <Trash2Icon className='h-5 w-5' />
                            Delete Note
                        </button>

                    </div>

                    <div className='card bg-base-100'>
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" placeholder="Note title" className="input input-bordered" value={note.title} onChange={e=>setNote({...note, title:e.target.value})}/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea className="textarea h-32 textarea-bordered resize-none" value={note.content} onChange={e=>setNote({...note, content:e.target.value})} />
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage
