import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllQuestionQuery, useGetQuestionStatisticsQuery } from '@store/api';
import { Loader } from '@src/components';
import { UITitle } from '@src/components/Base UI';
import './QuestionStatisticsPage.css'

// Lazy load the Doughnut and Bar components
const LazyDoughnut = React.lazy(() =>
    import('react-chartjs-2').then(({ Doughnut }) => {
        return import('chart.js').then((chartjs) => {
            chartjs.Chart.register(chartjs.ArcElement, chartjs.Tooltip, chartjs.Legend);
            return { default: Doughnut };
        });
    })
);

const LazyBar = React.lazy(() =>
    import('react-chartjs-2').then(({ Bar }) => {
        return import('chart.js').then((chartjs) => {
            chartjs.Chart.register(chartjs.BarElement, chartjs.CategoryScale, chartjs.LinearScale, chartjs.Tooltip, chartjs.Legend);
            return { default: Bar };
        });
    })
);

const LazyLine = React.lazy(() =>
    import('react-chartjs-2').then(({ Line }) => {
        return import('chart.js').then((chartjs) => {
            chartjs.Chart.register(chartjs.LineElement, chartjs.CategoryScale, chartjs.LinearScale, chartjs.PointElement, chartjs.Tooltip, chartjs.Legend);
            return { default: Line };
        });
    })
);

const LazyRadar = React.lazy(() =>
    import('react-chartjs-2').then(({ Radar }) => {
        return import('chart.js').then((chartjs) => {
            chartjs.Chart.register(chartjs.RadarController, chartjs.RadialLinearScale, chartjs.PointElement, chartjs.LineElement, chartjs.Filler, chartjs.Tooltip, chartjs.Legend);
            return { default: Radar };
        });
    })
);

const QuestionStatisticsPage = () => {
    const { quizId } = useParams<{ quizId: string }>() as { quizId: string };
    const navigate = useNavigate();
    const { data: questions, isLoading: isLoadingQuestions } = useGetAllQuestionQuery(quizId);
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
    const [chartType, setChartType] = useState('doughnut');

    const { data: statistics, isLoading: isLoadingStatistics } = useGetQuestionStatisticsQuery(selectedQuestionId ?? '', {
        skip: !selectedQuestionId,
    });

    useEffect(() => {
        if (questions && questions.length > 0 && !selectedQuestionId) {
            setSelectedQuestionId(questions[0].id);
        }
    }, [questions, selectedQuestionId]);

    const chartData = useMemo(() => {
        if (!statistics) return null;
        const totalResponses = statistics.options.reduce((total, option) => total + option.count, 0);
        return {
            labels: statistics.options.map(option => {
                const percentage = ((option.count / totalResponses) * 100).toFixed(2);
                return `${option.value} (${percentage}%)`;
            }),
            datasets: [{
                label: 'Статистика вопросов',
                data: statistics.options.map(option => option.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CB3F', '#3FCB9F'],
                hoverOffset: 4
            }]
        };
    }, [statistics]);

    if (isLoadingQuestions || !chartData) return <Loader />;
    return (
        <Suspense fallback={<Loader />}>
            <div className='question-stat page'>
                <div className="question-stat__inner">
                    <div className="back" onClick={() => navigate(-1)}>Назад</div>
                    <UITitle title='Статистика' subtitle='Статистика вопроса' />
                    <div className='question-stat__nav'>
                        <button className={chartType === 'doughnut' ? 'selected' : ''} onClick={() => setChartType('doughnut')}>Круговая</button>
                        <button className={chartType === 'bar' ? 'selected' : ''} onClick={() => setChartType('bar')}>Столбчатая</button>
                        <button className={chartType === 'line' ? 'selected' : ''} onClick={() => setChartType('line')}>Линейная</button>
                        <button className={chartType === 'radar' ? 'selected' : ''} onClick={() => setChartType('radar')}>Радарная</button>
                    </div>
                    <select className='select-custom' onChange={(e) => setSelectedQuestionId(e.target.value)} value={selectedQuestionId ?? ''}>
                        {questions?.map((question) => (
                            <option key={question.id} value={question.id}>
                                {question.title}
                            </option>
                        ))}
                    </select>
                    {isLoadingStatistics ? (
                        <Loader />
                    ) : (
                        statistics && (
                            <div>
                                <h2 className='question-stat__name'>{statistics.question}</h2>
                                <Suspense fallback={<div>Загрузка диаграммы...</div>}>
                                    {chartType === 'doughnut' && <LazyDoughnut data={chartData} />}
                                    {chartType === 'bar' && <LazyBar data={chartData} />}
                                    {chartType === 'line' && <LazyLine data={chartData} />}
                                    {chartType === 'radar' && <LazyRadar data={chartData} />}
                                </Suspense>
                                <p>Last updated: {statistics.updatedAt}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </Suspense>
    );
};

export default QuestionStatisticsPage;