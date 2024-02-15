import React, { useState } from 'react';
import SidebarIcon from "@assets/icons/sidebar-icon.svg"
import DeleteIcon from "@assets/icons/delete.svg"
import EditIcon from "@assets/icons/edit.svg"
import "./AddQuestionPage.css"
import { useForm } from 'react-hook-form';
import UIField from '@src/components/Base UI/UIField';
import UIForm from '@src/components/Base UI/UIForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateQuestionMutation, useDeleteQuestionMutation, useGetAllQuestionsQuery } from '@src/store/api/question-api';
import { ErrorResponse } from '@src/interfaces';
import toast from 'react-hot-toast';

const AddQuestionPage: React.FC = () => {
    // OTHER
    const navigate = useNavigate();
    const { quizId } = useParams() as { quizId: string };

    // API
    const { data: questions, refetch } = useGetAllQuestionsQuery(quizId);
    const [ deleteQuestion ] = useDeleteQuestionMutation();
    const [ createQuestion ] = useCreateQuestionMutation();

    // LOCAL STATE
    const { register, handleSubmit, formState: { errors } } = useForm<{
        title: string;
        options: { value: string; weight: number }[];
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
    const onSubmit = async (data: { title: string; options: { value: string; weight: number }[]}) => {
        const transformedOptions = data.options.map(option => ({
            ...option,
            weight: Number(option.weight)
        }));

        const submitData = {
            quizId,
            question: {
                title: data.title,
                options: transformedOptions
            }
        };
        try {
            const res = await createQuestion(submitData).unwrap();
            toast.success(`Question "${res.title}" was successfully added!`);
            refetch();
        } catch (err) {
            const error = err as ErrorResponse
            if (error.status === 401) {
                toast.error("You don't have enough rights to create a question")
            }
            toast.error(`${error.data?.message}`);
            console.error(err);
        }
    };

    // DELETE
    const handleDelete = async (questionId: string) => {
        try {
            await deleteQuestion({quizId, questionId}).unwrap();
            toast.success("Question was successfuly deleted!");
            refetch();
        } catch (err) {
            const error = err as ErrorResponse
            if (error.status === 401) {
                toast.error("You don't have enough rights to delete a question")
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
                <div className="question-form__back" onClick={() => navigate(-1)}>Back</div>
                <div className="ui-title__head" style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <h1 className="ui-title__title" style={{ fontSize: '36px' }}>Add Question</h1>
                    <p className="ui-title__desc" style={{ fontSize: '18px' }}>Add a question for the current test</p>
                </div>
                <UIField
                    label='Name'
                    id='questionTitle'
                    inputProps={{ ...register("title", { required: "Name is required!" }), placeholder: 'Enter a question title' }}
                    error={errors.title?.message}
                />
                <div className="options-section">
                    <label className="form-label">Options</label>
                    <div className="options-list">
                        {Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className="option-item">
                                <input
                                    {...register(`options.${index}.value`, { required: "Option is required." })}
                                    type="text"
                                    className={`form-input option-input ${errors.options && errors.options[index] ? 'error' : ''}`}
                                    placeholder={`Option ${index + 1}`}
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
                    <button type="submit" className="add-question__button submit">Create</button>
                </div>
            </UIForm>
        </div>
    );
};

export default AddQuestionPage;