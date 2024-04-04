import { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { conv, message } from "../recoil/conversationAtom";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const selectedConversation = useRecoilValue(conv);
  const [messages,setMessages] = useRecoilState(message)

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;