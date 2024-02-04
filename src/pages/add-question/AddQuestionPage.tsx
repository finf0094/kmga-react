import { FC, useState } from 'react';
import SidebarIcon from "@assets/icons/sidebar-icon.svg"
import DeleteIcon from "@assets/icons/delete.svg"
import EditIcon from "@assets/icons/edit.svg"
import "./AddQuestionPage.css"
import { useForm } from 'react-hook-form';

const AddQuestionPage: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{
        title: string;
        options: {value: string; isCorrect: boolean}[];
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

    const onSubmit = (data: { title: string; options: {value: string; isCorrect: boolean}[], correctOption: string; }) => {
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
        <div className="add-question-page">
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <button onClick={toggleSidebar} className="sidebar-toggle">
                    <img src={SidebarIcon} alt="sidebar icon" />
                </button>
                <div className="sidebar-content">
                    {['UseEffect', 'Sssss', 'Hhjnbv'].map((text, index) => (
                        <div key={index} className={`sidebar-item ${activeItem === index ? 'active' : ''}`} onClick={() => handleItemClick(index)}>
                            <span className="sidebar-item-number">{index + 1}</span>
                            <span className="sidebar-item-text">{text}</span>
                            {activeItem === index && (
                                <div className="sidebar-item-actions">
                                    <button className="sidebar-action-button edit"><img src={EditIcon} alt="edit" /></button>
                                    <button className="sidebar-action-button delete"><img src={DeleteIcon} alt="delete" /></button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <form className='question-form' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-title-container">
                    <h1 className="form-title">Добавить вопрос</h1>
                </div>
                <input
                    {...register("title", { required: "Title is required." })}
                    type="text"
                    id="title"
                    className={`form-input ${errors.title ? 'error' : ''}`}
                    placeholder="Название"
                />
                {errors.title && <p className="form-error-message">{errors.title.message}</p>}
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
                    <button type="button" className="button cancel">Отменить</button>
                    <button type="submit" className="button submit">Создать</button>
                </div>
            </form>
        </div>
    );
};

export default AddQuestionPage;