// zustanc we use for global function
import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    // initially no conversation selected, so null, then when selected state is changed
    messages: [],
    setMessages: (messages) => set({messages}),
    // After messages come, it sets the state with new messages
}));
// This works just like useState, initially we declare a value and later we change it

export default useConversation;