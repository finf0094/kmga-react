import {FC} from "react";
import {useGetAllQuizQuery} from "@store/api/quiz-api.ts";
import QuizCard from "@components/Quiz/quiz-card/quiz-card.tsx";

const DashboardPage: FC = () => {
    const {data, isLoading, isError, error} = useGetAllQuizQuery({page: 1, perPage: 10, search: "ask"})

    if (isLoading) {
        return <div>loading</div>
    }

    if (isError) {
        console.error(error)
    }

    return (
        <div className='dashboard'>
            <div className="dashboard__title">
                {data?.data.map(item => (
                    <QuizCard key={item.id} title={item.title} description={item.description} tags={item.tags} status={item.status} createdAt={item.createdAt}/>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
