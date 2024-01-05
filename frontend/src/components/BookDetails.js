import { useParams } from "react-router-dom"
export const BookDetails = () => {
    const { bookID } = useParams()
    return (
        <div>BookDetails {bookID}</div>
    )
}
