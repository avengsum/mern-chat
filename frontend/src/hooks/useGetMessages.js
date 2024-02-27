import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { conv, message } from "../recoil/conversationAtom";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const  selectedConversation = useRecoilValue(conv)
  const [messages ,setMessages] = useRecoilState(message);
 
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id){
      getMessages();
    }
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;