import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios.js'

function CreatePage() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            await api.post("/notes", {
                title,
                content
            })
            toast.success("Note created");
            navigate("/")
        } catch (error) {
            toast.error("Failed to create note")
        } finally {
            setLoading(false);
            setTitle("");
            setContent("");
        }
    }

    return (
        <div className='min-h-screen bg-base-200 flex justify-center items-center'>
            <div className='w-full max-w-xl px-6 sm:px-8'>
                <Link
                    to={"/"}
                    className="btn btn-primary text-xl w-full mb-6 flex justify-center py-4"
                >
                    <ArrowLeftIcon className='size-7 mr-3' />
                    Back to Notes
                </Link>

                <div className='card bg-base-100 shadow-lg'>
                    <div className='card-body p-8 sm:p-12'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8'>
                            Create New Note
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text text-xl sm:text-2xl'>Title</span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='Note Title'
                                    className='input input-bordered text-xl py-4 px-6 w-full'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text text-xl sm:text-2xl'>Content</span>
                                </label>
                                <textarea
                                    placeholder='Write your note here...'
                                    className='textarea textarea-bordered text-xl py-4 px-6 h-40 sm:h-48 w-full resize-none'
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary w-full text-xl sm:text-2xl py-4'
                                disabled={loading}
                            >
                                Create Note
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
