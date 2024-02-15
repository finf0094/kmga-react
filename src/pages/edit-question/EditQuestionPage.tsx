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
        const transformedOptions = data.options.map(option => ({
            ...option,
            weight: Number(option.weight)
        }));
        const submitData = {
            id: questionId,
            title: data.title,
            options: transformedOptions
        };

        try {
            await updateQuestion({ quizId, question: submitData }).unwrap();
            toast.success(`Question was updated successfully!`);
            navigate(-1);
        } catch (err) {
            const error = err as ErrorResponse;
            toast.error(`${error.data?.message}`);
            console.error(err);
        }
    };

    return (
        <div className="edit-question page">
            <div className="back" onClick={() => navigate(-1)}>Back</div>
            <UITitle title='Question' subtitle='Edit a question' />
            <UIForm submitFn={handleSubmit(onSubmit)} isButton={false}>
                <UIField
                    label='Name'
                    id='questionTitle'
                    inputProps={{ ...register("title", { required: "Question name is required!" }), placeholder: 'Enter a question name' }}
                    error={errors.title?.message}
                />
                <div className="options-section">
                    <label className="form-label">Options</label>
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
                    <button type="button" className="add-question__button cancel" onClick={() => navigate('/dashboard')}>Cancel</button>
                    <button type="submit" className="add-question__button submit">Save</button>
                </div>
            </UIForm>
        </div>
    );
};

export default EditQuestionPage;