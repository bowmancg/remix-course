import { redirect } from "@remix-run/node";
import NewNote, {links as newNoteLinks} from "../components/NewNote";
import { getStoredNotes, storeNotes } from "../data/notes";
import NoteList, {links as noteListLinks} from "../components/NoteList";
import { useLoaderData } from "@remix-run/react";

export default function NotesPage() {
    const notes = useLoaderData()

    return(
        <main>
            <NewNote />
            <NoteList notes={notes} />
        </main>
    )
}

export async function loader() {
    const notes = await getStoredNotes()
    return notes
}

export async function action({request}) {
    const formData = await request.formData()
    const noteData = Object.fromEntries(formData)

    if (noteData.title.trim().length < 5) {
        return {message: 'Must be at least 5 characters long.'}
    }

    const existingNotes = await getStoredNotes()
    noteData.id = new Date().toISOString()
    const updatedNotes = existingNotes.concat(noteData)
    await storeNotes(updatedNotes)
    return redirect('/notes')
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()]
}