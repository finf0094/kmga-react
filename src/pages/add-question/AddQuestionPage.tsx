import React, { useState } from 'react';
import SidebarIcon from "@assets/icons/sidebar-icon.svg"
import DeleteIcon from "@assets/icons/delete.svg"
import EditIcon from "@assets/icons/edit.svg"
import "./AddQuestionPage.css"
import { useForm } from 'react-hook-form';
import UIField from '@src/components/Base UI/UIField';
import UIForm from '@src/components/Base UI/UIForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateQuestionMutation, useDeleteQuestionMutation, useGetAllQuestionQuery } from '@src/store/api/question-api';
import { ErrorResponse } from '@src/interfaces';
import toast from 'react-hot-toast';

const AddQuestionPage: React.FC = () => {
    // OTHER
    const navigate = useNavigate();
    const { quizId } = useParams() as { quizId: string };

    // API
    const { data: questions, refetch } = useGetAllQuestionQuery(quizId);
    const [ deleteQuestion ] = useDeleteQuestionMutation();
    const [ createQuestion ] = useCreateQuestionMutation();

    // LOCAL STATE
    const { register, handleSubmit, formState: { errors } } = useForm<{
        title: string;
        options: { value: string; isCorrect: boolean }[];
        correctOption: string;
    }>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const toggleSidebar = () => {
        if (isSidebarOpen) {
            setActiveItem(null);
        }
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleItemClick = (index: number) => {
        if (!isSidebarOpen) {
            setIsSidebarOpen(true)
        }
        setActiveItem(index === activeItem ? null : index);
    };


    // SUBMIT
    const onSubmit = async (data: { title: string; options: { value: string; isCorrect: boolean }[], correctOption: string; }) => {
        const updatedOptions = data.options.map((option, index) => ({
            ...option,
            isCorrect: data.correctOption === String(index) // Сравниваем с индексом правильного варианта
        }));
        const submitData = {
            quizId,
            title: data.title,
            options: updatedOptions
        };
        try {
            const res = await createQuestion(submitData).unwrap();
            toast.success(`Вопрос "${res.title}" был успешно создан!`);
            refetch();
        } catch (err) {
            const error = err as ErrorResponse
            if (error.status === 401) {
                toast.error('Не хватает прав для создания вопроса!')
            }
            toast.error(`${error.data?.message}`);
            console.error(err);
        }
    };

    // DELETE
    const handleDelete = async (questionId: string) => {
        try {
            await deleteQuestion(questionId).unwrap();
            toast.success("Вопрос был успешно удален!");
            refetch();
        } catch (err) {
            const error = err as ErrorResponse
            if (error.status === 401) {
                toast.error('Не хватает прав для удаления вопроса!')
            }
            toast.error(`${error.data?.message}`);
            console.error(err);
        }
    }

    // EDIT
    const handleEdit = (questionId: string) => {
        navigate(`/quiz/${quizId}/question/${questionId}`);
    };
    
    return (
        <div className="add-question">
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <img src={SidebarIcon} alt="sidebar icon" onClick={toggleSidebar} className='sidebar__toggle' />
                <div className="sidebar__content">
                    {questions?.map((question, index) => (
                        <div key={index} className={`sidebar__item ${activeItem === index ? 'active' : ''}`} onClick={() => handleItemClick(index)}>
                            <span className="sidebar__item-number">{index + 1}</span>
                            <span className="sidebar__item-text">{question.title}</span>
                            {activeItem === index && (
                                <div className="sidebar__item-actions">
                                    <button className="sidebar__action-button edit" onClick={() => handleEdit(question.id)}><img src={EditIcon} alt="edit" /></button>
                                    <button className="sidebar__action-button delete" onClick={() => handleDelete(question.id)}><img src={DeleteIcon} alt="delete" /></button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <UIForm submitFn={handleSubmit(onSubmit)} isButton={false}>
                <div className="question-form__back" onClick={() => navigate(-1)}>Назад</div>
                <div className="ui-title__head" style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <h1 className="ui-title__title" style={{ fontSize: '36px' }}>Добавить вопрос</h1>
                    <h1 className="ui-title__desc" style={{ fontSize: '18px' }}>Добавить вопрос для текущего теста</h1>
                </div>
                <UIField
                    label='Название'
                    id='questionTitle'
                    inputProps={{ ...register("title", { required: "Название вопроса должно быть обязательным!" }), placeholder: 'Введите название вопроса' }}
                    error={errors.title?.message}
                />
                <div className="options-section">
                    <label className="form-label">Опций</label>
                    <div className="options-list">
                        {Array.from({ length: 4 }, (_, index) => (
                            <div key={index} className="option-item">
                                <input
                                    {...register(`options.${index}.value`, { required: "Option is required." })}
                                    type="text"
                                    className={`form-input option-input ${errors.options && errors.options[index] ? 'error' : ''}`}
                                    placeholder={`Option ${index + 1}`}
                                />
                                <input
                                    {...register("correctOption")}
                                    type="radio"
                                    value={index}
                                    className="option-radio"
                                />
                                {errors.options && errors.options[index] && (
                                    <p className="form-error-message">{errors.options[index]?.message}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="button-group">
                    <button type="button" className="add-question__button cancel" onClick={() => navigate('/dashboard')}>Отменить</button>
                    <button type="submit" className="add-question__button submit">Создать</button>
                </div>
            </UIForm>
        </div>
    );
};

export default AddQuestionPage;