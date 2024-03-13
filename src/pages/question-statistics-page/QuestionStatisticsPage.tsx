import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllQuestionsQuery,
  useGetQuestionStatisticsQuery,
  useGetQuizStatisticsQuery,
} from "@store/api";
import { Loader } from "@src/components";
import { UITitle } from "@src/components/Base UI";
import "./QuestionStatisticsPage.css";

// Lazy load the Doughnut and Bar components
const LazyDoughnut = React.lazy(() =>
  import("react-chartjs-2").then(({ Doughnut }) => {
    return import("chart.js").then((chartjs) => {
      chartjs.Chart.register(
        chartjs.ArcElement,
        chartjs.Tooltip,
        chartjs.Legend,
      );
      return { default: Doughnut };
    });
  }),
);

const LazyBar = React.lazy(() =>
  import("react-chartjs-2").then(({ Bar }) => {
    return import("chart.js").then((chartjs) => {
      chartjs.Chart.register(
        chartjs.BarElement,
        chartjs.CategoryScale,
        chartjs.LinearScale,
        chartjs.Tooltip,
        chartjs.Legend,
      );
      return { default: Bar };
    });
  }),
);

const LazyLine = React.lazy(() =>
  import("react-chartjs-2").then(({ Line }) => {
    return import("chart.js").then((chartjs) => {
      chartjs.Chart.register(
        chartjs.LineElement,
        chartjs.CategoryScale,
        chartjs.LinearScale,
        chartjs.PointElement,
        chartjs.Tooltip,
        chartjs.Legend,
      );
      return { default: Line };
    });
  }),
);

const LazyRadar = React.lazy(() =>
  import("react-chartjs-2").then(({ Radar }) => {
    return import("chart.js").then((chartjs) => {
      chartjs.Chart.register(
        chartjs.RadarController,
        chartjs.RadialLinearScale,
        chartjs.PointElement,
        chartjs.LineElement,
        chartjs.Filler,
        chartjs.Tooltip,
        chartjs.Legend,
      );
      return { default: Radar };
    });
  }),
);

const QuestionStatisticsPage = () => {
  const { quizId } = useParams<{ quizId: string }>() as { quizId: string };
  const navigate = useNavigate();
  const { data: questions, isLoading: isLoadingQuestions } =
    useGetAllQuestionsQuery(quizId);
  const { data: quizStatistics, isLoading: isLoadingQuizStatistics } =
    useGetQuizStatisticsQuery(quizId);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  );
  const [chartType, setChartType] = useState("doughnut");

  const { data: statistics, isLoading: isLoadingStatistics } =
    useGetQuestionStatisticsQuery(selectedQuestionId ?? "", {
      skip: !selectedQuestionId,
    });

  useEffect(() => {
    if (questions && questions.length > 0 && !selectedQuestionId) {
      setSelectedQuestionId(questions[0].id);
    }
  }, [questions, selectedQuestionId]);

  useEffect(() => {
    if (chartType === "last" && questions && questions.length > 0) {
      setSelectedQuestionId(questions[questions.length - 1].id);
    }
  }, [chartType, questions]);

  const chartData = useMemo(() => {
    if (!statistics) return null;
    const totalResponses = statistics.options.reduce(
      (total, option) => total + option.count,
      0,
    );
    return {
      labels: statistics.options.map((option) => {
        const percentage =
          totalResponses > 0
            ? ((option.count / totalResponses) * 100).toFixed(2)
            : "0.00";
        return `${option.value} (${percentage}%)`;
      }),
      datasets: [
        {
          label: "Question statistics",
          data: statistics.options.map((option) => option.count),
          backgroundColor: [
            "#ffb138",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#C9CB3F",
            "#3FCB9F",
          ],
          hoverOffset: 4,
        },
      ],
    };
  }, [statistics]);

  const averageChartData = useMemo(() => {
    if (!quizStatistics) return null;

    return {
      labels: quizStatistics.questions
        ? quizStatistics.questions.map((question) => question.title)
        : [],
      datasets: [
        {
          label: "Average Score Percentage",
          data: quizStatistics.questions
            ? quizStatistics.questions.map((question) => question.averageScore)
            : [],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [quizStatistics]);

  if (
    isLoadingQuestions ||
    !chartData ||
    isLoadingQuizStatistics ||
    !statistics ||
    !averageChartData
  )
    return <Loader />;

  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function (_: any, index: number) {
            return index + 1;
          },
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        ticks: {
          callback: function (tickValue: string | number) {
            const value =
              typeof tickValue === "number" ? tickValue : parseFloat(tickValue);
            return `${value}%`;
          },
        },
      },
    },
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="question-stat page">
        <div className="question-stat__inner">
          <div className="back" onClick={() => navigate(-1)}>
            Back
          </div>
          <UITitle title="Statistics" subtitle="Question statistics" />
          <div className="question-stat__nav">
            <button
              className={chartType === "doughnut" ? "selected" : ""}
              onClick={() => setChartType("doughnut")}
            >
              Circular
            </button>
            <button
              className={chartType === "bar" ? "selected" : ""}
              onClick={() => setChartType("bar")}
            >
              Columnar
            </button>
            <button
              className={chartType === "line" ? "selected" : ""}
              onClick={() => setChartType("line")}
            >
              Linear
            </button>
            <button
              className={chartType === "radar" ? "selected" : ""}
              onClick={() => setChartType("radar")}
            >
              Radar
            </button>
            <button
              className={chartType === "average" ? "selected" : ""}
              onClick={() => setChartType("average")}
            >
              Average
            </button>
            <button
              className={chartType === "last" ? "selected" : ""}
              onClick={() => setChartType("last")}
            >
              Last
            </button>
          </div>
          {chartType !== "average" && chartType !== "last" ? (
            <div className="question-stat__content">
              <select
                className="select-custom"
                onChange={(e) => setSelectedQuestionId(e.target.value)}
                value={selectedQuestionId ?? ""}
              >
                {questions?.map((question, index) => (
                  <option key={question.id} value={question.id}>
                    {index + 1}. {question.title}
                  </option>
                ))}
              </select>
              {isLoadingStatistics ? (
                <Loader />
              ) : (
                statistics && (
                  <div className="question-stat__chart">
                    <h2 className="question-stat__name">
                      {statistics.question}
                    </h2>
                    <h3 className="question-stat__name">
                      Average: {statistics.averageWeight.toFixed(2)}%
                    </h3>
                    <Suspense fallback={<div>Loading chart...</div>}>
                      {chartType === "doughnut" && (
                        <div
                          style={{
                            width: "30vw",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0px auto",
                          }}
                        >
                          {" "}
                          <LazyDoughnut data={chartData} />
                        </div>
                      )}
                      {chartType === "bar" && <LazyBar data={chartData} />}
                      {chartType === "line" && <LazyLine data={chartData} />}
                      {chartType === "radar" && <LazyRadar data={chartData} />}
                    </Suspense>
                  </div>
                )
              )}
            </div>
          ) : chartType === "last" ? (
            <div className="question-stat__chart">
              <h2 className="question-stat__name">{statistics.question}</h2>
              <div
                style={{
                  display: "flex",
                  gap: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <h3 className="question-stat__name">
                  Average: {statistics.averageWeight.toFixed(2)}%
                </h3>
                {quizStatistics && (
                  <h3 className="question-stat__name">
                    Count {quizStatistics.count}
                  </h3>
                )}
              </div>
              <Suspense fallback={<div>Loading chart...</div>}>
                <LazyBar data={chartData} />
              </Suspense>
            </div>
          ) : (
            <div className="question-stat__chart">
              {averageChartData && (
                <Suspense fallback={<div>Loading chart...</div>}>
                  <LazyBar data={averageChartData} options={options} />
                </Suspense>
              )}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default QuestionStatisticsPage;
