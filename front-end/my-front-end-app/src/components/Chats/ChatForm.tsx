import { useEffect, useState } from "react";
import { getIdFromToken } from "../../utils/apiUtils";
import axios from "axios";
import FormButtons from "./FormButtons";

type ChatFormProps = {
  addChatOnClick: () => void;
};

const ChatForm = ({ addChatOnClick }: ChatFormProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [chatName, setChatName] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<number>(2);
  const [description, setDescription] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  useEffect(() => {
    const myToken = localStorage.getItem("token");
    setToken(myToken);
    const fetchData = async () => {
      const response = await getIdFromToken();
      setId(response);
      console.log(response);
    };
    fetchData();
  }, [setToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(id, chatName, maxParticipants, description, isPrivate);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/chats",
        {
          ownerId: id,
          imageUrl: "",
          chatName,
          maxParticipants,
          description,
          isPrivate,
          is2: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response)
        console.error(err.response.data);
      else console.error(err);
    }
    addChatOnClick();
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-slate-500/80 absolute z-10">
      <form
        action="http://localhost:8081/api/chats/"
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-10 bg-slate-200 rounded-xl px-10"
      >
        <div>
          <input
            type="text"
            name="id"
            id="id"
            value={id ?? ""}
            hidden
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="chatName">
            Chat Name
          </label>
          <input
            type="text"
            name="chatName"
            id="chatName"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold" htmlFor="maxParticipants">
            Max Participants
          </label>
          <input
            type="number"
            name="maxParticipants"
            id="maxParticipants"
            min="2"
            max="124"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-start w-full gap-2">
          <label className="text-sm font-semibold" htmlFor="isPrivate">
            Private
          </label>
          <input
            className="h-5 aspect-square"
            type="checkbox"
            name="isPrivate"
            id="isPrivate"
            checked={isPrivate}
            onChange={() => setIsPrivate((prev) => !prev)}
          />
        </div>
        <FormButtons addChatOnClick={addChatOnClick} />
      </form>
    </div>
  );
};

export default ChatForm;
