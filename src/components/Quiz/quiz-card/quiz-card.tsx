interface ICardProps {
    title: string,
    description: string,
    status: string,
    tags: string[],
    createdAt: string
}


export default function QuizCard({title, description, status, tags, createdAt}: ICardProps) {
    return (
        <>
            <h2>
                {title}
            </h2>
            <p>
                {description}
            </p>
            <button>
                change button
            </button>
            <span>
                {status}
            </span>
            <p>
                {tags}
            </p>
            <p>
                {createdAt}
            </p>
        </>
    )
}