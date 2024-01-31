import { Link, json, useLoaderData } from "@remix-run/react";
import styles from '../styles/note-details.css'
import {getStoredNotes} from '../data/notes'

export default function NoteDetailsPage() {
    const note = useLoaderData()

    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to notes.</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
        </main>
    )
}

export async function loader({params}) {
    const notes = await getStoredNotes()
    const noteId = params.noteId
    const selectedNote = notes.find(note => note.id === noteId)

    if (!selectedNote) {
        throw json(
        {message: 'Could not find note ' + noteId},
        {status: 404}
        )
    }

    return selectedNote
}

export function links() {
    return [{rel: "stylesheet", href: styles}]
}

export const meta = ({data}) => {
    return [
        {title: data.title},
        {
            property: "og:title",
            content: data.content
        },
        {
            name: "description",
            content: "Remix"
        }
    ]
}