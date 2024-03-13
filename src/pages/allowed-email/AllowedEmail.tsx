import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useGetAllSessionsQuery,
  useSendSessionToEmailMutation,
} from "@store/api";
import { UIField, UITitle } from "@components/Base UI";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader, Pagination } from "@components";
import "./AllowedEmail.css";
import { SessionStatus } from "@interfaces";

const AllowedEmailPage = () => {
  const { quizId } = useParams() as { quizId: string };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<SessionStatus | null>(
    null,
  );

  const [createSession, { isLoading: isCreating }] = useCreateSessionMutation();
  const [sendSession, { isLoading: isSending }] =
    useSendSessionToEmailMutation();
  const [deleteSession, { isLoading: isDeleting }] = useDeleteSessionMutation();
  const {
    data: sessions,
    isLoading: isSessionsLoading,
    refetch,
  } = useGetAllSessionsQuery({
    page: currentPage,
    status: selectedStatus,
    quizId,
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleCreate = async () => {
    if (email) {
      if (!validateEmail(email)) {
        toast.error("Please, enter a valid email.");
        return;
      }
      try {
        if (sessions?.data.find((session) => session.email?.email === email)) {
          toast.error("This email is already exists.");
          return;
        }

        await createSession({ quizId, email });
        toast.success("Session was created successfully.");
        setEmail("");
        refetch(); // Обновить список после добавления
      } catch (error) {
        console.error("Error creating session:", error);
        toast.error("Error creating session.");
      }
    } else {
      toast.error("Please, enter a email.");
    }
  };

  const sendSessionToEmail = async (sessionId: string, language: string) => {
    try {
      await sendSession({ sessionId, language });
      toast.success("Session was sended successfully.");
      refetch();
    } catch (error) {
      console.error("Error sending session:", error);
      toast.error("Error sending session.");
    }
  };

  const handleDelete = async (sessionId: string) => {
    try {
      await deleteSession(sessionId);
      toast.success("Session was deleted successfully.");
      refetch();
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Error deleting session.");
    }
  };
  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (value === "All") {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(value as SessionStatus);
    }
  };

  if (isCreating || isSessionsLoading || isDeleting || isSending)
    return <Loader />;

  return (
    <div className="allowed-email page">
      <div className="back" onClick={() => navigate(-1)}>
        Back
      </div>
      <UITitle title="Session" subtitle="Create a session for a user" />
      <div className="allowed-email__create">
        <UIField
          id={`email-${quizId}`}
          inputProps={{
            value: email,
            onChange: handleEmailChange,
            type: "email",
          }}
          label="Email"
        />
        <button onClick={handleCreate} className="allowed-email__button">
          Create
        </button>
        <div className="allowed-email__select">
          <select className="select-custom" onChange={handleStatusChange}>
            <option value="All">All</option>
            <option value={SessionStatus.COMPLETED}>Completed</option>
            <option value={SessionStatus.MAIL_SENDED}>Mail sent</option>
            <option value={SessionStatus.NOT_STARTED}>Not Started</option>
            <option value={SessionStatus.IN_PROGRESS}>In Progress</option>
          </select>
        </div>
      </div>
      {sessions && sessions.data.length > 0 ? (
        <div className="allowed-email__table">
          <table>
            <thead>
              <tr>
                <td className="user">
                  <span>Email</span> <span>Status</span>
                  <span>Delete</span>
                </td>
              </tr>
            </thead>
            <tbody>
              {sessions.data?.map((session) => (
                <tr key={session.id}>
                  <td className="user">
                    {session.status === "COMPLETED" ? (
                      <Link to={`/session/${session.id}/statistics`}>
                        {session?.email?.email}
                      </Link>
                    ) : (
                      <>
                        <span>{session?.email?.email}</span>
                      </>
                    )}
                    {(session.status === "COMPLETED" && "Completed") ||
                      (session.status === "NOT_STARTED" && "Not Started") ||
                      (session.status === "IN_PROGRESS" && "In Progress") ||
                      (session.status === "MAIL_SENDED" && "Mail Sent")}
                    <div className="allowed-email__actions">
                      {(session.status === "NOT_STARTED" ||
                        session.status === "MAIL_SENDED") && (
                        <button
                          className="allowed-email__action send"
                          onClick={() => sendSessionToEmail(session.id, "ru")}
                        >
                          Send ru
                        </button>
                      )}
                      {(session.status === "NOT_STARTED" ||
                        session.status === "MAIL_SENDED") && (
                        <button
                          className="allowed-email__action send"
                          onClick={() => sendSessionToEmail(session.id, "en")}
                        >
                          Send en
                        </button>
                      )}
                      <button
                        className="allowed-email__action delete"
                        onClick={() => handleDelete(session.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="allowed-email__empty">No sessions</h3>
      )}
      {sessions && <p>Count: {sessions.meta.total}</p>}
      {sessions && (
        <Pagination
          meta={sessions.meta}
          visiblePages={10}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default AllowedEmailPage;
