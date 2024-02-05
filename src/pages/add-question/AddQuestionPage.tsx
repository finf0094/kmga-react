import React, { useState } from 'react';
import SidebarIcon from "@assets/icons/sidebar-icon.svg"
import DeleteIcon from "@assets/icons/delete.svg"
import EditIcon from "@assets/icons/edit.svg"
import "./AddQuestionPage.css"
import { useForm } from 'react-hook-form';
import UIField from '@src/components/Base UI/UIField';
import UIForm from '@src/components/Base UI/UIForm';
import { useNavigate } from 'react-router-dom';

const AddQuestionPage: React.FC = () => {
    const navigate = useNavigate();
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

    const onSubmit = (data: { title: string; options: { value: string; isCorrect: boolean }[], correctOption: string; }) => {
        const updatedOptions = data.options.map((option, index) => ({
            ...option,
            isCorrect: data.correctOption === String(index) // Сравниваем с индексом правильного варианта
        }));
        const submitData = {
            title: data.title,
            options: updatedOptions
        };
        console.log(submitData);
    };

    return (
        <div className="add-question">
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <img src={SidebarIcon} alt="sidebar icon" onClick={toggleSidebar} className='sidebar__toggle' />
                <div className="sidebar__content">
                    {['UseEffect', 'Sssss', 'Hhjnbv'].map((text, index) => (
                        <div key={index} className={`sidebar__item ${activeItem === index ? 'active' : ''}`} onClick={() => handleItemClick(index)}>
                            <span className="sidebar__item-number">{index + 1}</span>
                            <span className="sidebar__item-text">{text}</span>
                            {activeItem === index && (
                                <div className="sidebar__item-actions">
                                    <button className="sidebar__action-button edit"><img src={EditIcon} alt="edit" /></button>
                                    <button className="sidebar__action-button delete"><img src={DeleteIcon} alt="delete" /></button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
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