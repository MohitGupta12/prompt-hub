import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

// GET (read)
export const GET = async (request,{params})=>{
    try {
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate('creator').maxTime(30000);
        if(!prompt) return new Response("Prompt not Found", {status:404})
        return new Response(JSON.stringify(prompt),{status: 200,})
    } catch (error) {
        return new Response("Failed to get prompts",{status: 500})
    }
}

//PATCH (edit)
export const PATCH = async (request,{params}) => {
    const{prompt, tag} = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        console.log(existingPrompt)
        if(!existingPrompt) return new Response("Prompt not Found", {status:404});
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response("Prompt updated Successfully",{status: 200,})
    } catch (error) {
        console.log(error);
        return new Response("Failed to Edit prompt",{status: 500})
    }
}

//DELETE (remove)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await  Prompt.findOneAndDelete({ _id: params.id });


        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error deleting prompt", { status: 500 });
    }
};




