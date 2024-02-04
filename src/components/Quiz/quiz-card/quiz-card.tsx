import './quiz-card.css';
import PlusIcon from "@assets/icons/plus.svg"
import ChangeIcon from "@assets/icons/change.svg"
import { formatDate } from '@src/utils';
import { getStatusText } from '@src/utils/getStatusText';

interface ICardProps {
    title: string,
    description?: string,
    status: string,
    tags: string[],
    createdAt: string
}

export default function QuizCard({ title, status, tags, createdAt }: ICardProps) {
    const { day, month, year, hours, minutes } = formatDate(createdAt);

    return (
        <div className="quiz-card">
            <div className="quiz-card-top">
                <div className='quiz-card-header-left'>
                    <h3 className="quiz-card-title">{title}</h3>
                    <div className="quiz-card-status">
                        <span className={`status-dot ${status.toLowerCase()}`}></span>
                        <span className={`status-description ${status.toLowerCase()}`}>{getStatusText(status)}</span>
                    </div>
                </div>
                <div className="quiz-card-header-right">
                    <div className="icons">
                        <img src={PlusIcon} alt="Add" />
                        <img src={ChangeIcon} alt="Edit" />
                    </div>
                    <div className="quiz-card-footer">
                        <div className="quiz-date">{`${day} ${month} ${year} года в ${hours}:${minutes}`}</div>
                    </div>
                </div>
            </div>
            <div className="quiz-card-footer">
                <span className="quiz-card-tags-title">Тэги</span>
                <ul className='quiz-card-tags'>
                    {tags.map((tag, index) => <li className="quiz-tag" key={index}>{tag}</li>)}
                </ul>
            </div>
        </div>
    )
}