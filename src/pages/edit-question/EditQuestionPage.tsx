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
    const { questionId } = useParams() as { questionId: string };
    const navigate = useNavigate();

    // API
    const { data: questionData } = useGetQuestionByIdQuery(questionId);
    const [updateQuestion] = useUpdateQuestionMutation();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<{
        title: string;
        options: { id: string; value: string; isCorrect: boolean }[];
        correctOption: string;
    }>();

    useEffect(() => {
        if (questionData) {
            setValue('title', questionData.title);
            questionData.options.forEach((option, index) => {
                setValue(`options.${index}.id`, option.id);
                setValue(`options.${index}.value`, option.value)
                // Установка правильного ответа
                if (option.isCorrect) {
                    setValue('correctOption', String(index));
                }
            });
        }
    }, [questionData, setValue]);

    const onSubmit = async (data: { title: string; options: { id: string, value: string; isCorrect: boolean }[], correctOption: string; }) => {
        const updatedOptions = data.options.map((option, index) => ({
            ...option,
            isCorrect: data.correctOption === String(index) // Сравниваем с индексом правильного варианта
        }));
        const submitData = { 
            questionId,
            title: data.title,
            options: updatedOptions
        };
        
        try {
            await updateQuestion(submitData).unwrap();
            toast.success(`Вопрос был успешно обновлён! Обновите страницу`);
            navigate(-1);
        } catch (err) {
            const error = err as ErrorResponse;
            if (error.status === 403) {
                toast.error('Не хватает прав для обновления вопроса!');
            }
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
                                    {...register("correctOption")}
                                    type="radio"
                                    value={index}
                                    className="option-radio"
                                    defaultChecked={option.isCorrect} // Установка выбранного правильного ответа
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