import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetQuestionByIdQuery, useUpdateQuestionMutation } from '@src/store/api/question-api';
import UIField from '@src/components/Base UI/UIField';
import { UIForm, UITitle } from '@src/components/Base UI';
import './EditQuestionPage.css';
import toast from 'react-hot-toast';
import { ErrorResponse } from '@src/interfaces';

const EditQuestionPage = () => {
    // OTHERS
    const { questionId, quizId } = useParams() as { questionId: string, quizId: string };
    const navigate = useNavigate();

    // API
    const { data: questionData } = useGetQuestionByIdQuery({quizId, questionId});
    const [updateQuestion] = useUpdateQuestionMutation();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<{
        title: string;
        options: { id: string; value: string; weight: number }[];
    }>();

    useEffect(() => {
        if (questionData) {
            setValue('title', questionData.title);
            questionData.options.forEach((option, index) => {
                setValue(`options.${index}.id`, option.id);
                setValue(`options.${index}.value`, option.value);
                // Установка веса ответа
                setValue(`options.${index}.weight`, option.weight || 0); // Предполагаем, что у вас есть поле weight
            });
        }
    }, [questionData, setValue]);

    const onSubmit = async (data: { title: string; options: { id: string, value: string; weight: number }[] }) => {
        const updatedOptions = data.options.map((option) => ({
            id: option.id,
            value: option.value,
            weight: option.weight // Используем вес, введенный пользователем
        }));
        const submitData = {
            id: questionId,
            title: data.title,
            options: updatedOptions
        };

        try {
            await updateQuestion({quizId, question: submitData}).unwrap();
            toast.success(`Вопрос был успешно обновлён! Обновите страницу`);
            navigate(-1);
        } catch (err) {
            const error = err as ErrorResponse;
            toast.error(`${error.data?.message}`);
            console.error(err);
        }
    };

    return (
        <div className="edit-question page">
            <div className="back" onClick={() => navigate(-1)}>Назад</div>
            <UITitle title='Вопрос' subtitle='Редактирование вопроса' />
            <UIForm submitFn={handleSubmit(onSubmit)} isButton={false}>
                <UIField
                    label='Название'
                    id='questionTitle'
                    inputProps={{ ...register("title", { required: "Название вопроса должно быть обязательным!" }), placeholder: 'Введите название вопроса' }}
                    error={errors.title?.message}
                />
                <div className="options-section">
                    <label className="form-label">Опций</label>
                    <div className="options-list">
                        {questionData?.options.map((option, index) => (
                            <div key={index} className="option-item">
                                <input
                                    {...register(`options.${index}.value`, { required: "Option is required." })}
                                    type="text"
                                    className={`form-input option-input ${errors.options && errors.options[index] ? 'error' : ''}`}
                                    placeholder={`Option ${index + 1}`}
                                    defaultValue={option.value} // Установка значения по умолчанию
                                />
                                <input
                                    {...register(`options.${index}.weight`, { required: "Weight is required." })}
                                    type="number"
                                    className={`form-input option-input ${errors.options && errors.options[index] ? 'error' : ''}`}
                                    placeholder={`Weight ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="button-group">
                    <button type="button" className="add-question__button cancel" onClick={() => navigate('/dashboard')}>Отменить</button>
                    <button type="submit" className="add-question__button submit">Сохранить</button>
                </div>
            </UIForm>
        </div>
    );
};

export default EditQuestionPage;