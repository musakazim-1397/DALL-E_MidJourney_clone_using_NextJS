import {OpenAIApi,Configuration} from 'openai'

const configuration = new Configuration({
    apiKey: process.env.openai_secret_key
})

const openai = new OpenAIApi(configuration);

const handler = async (req,res)=>{
    const name = req.body.name;
    const prompt = req.body.prompt;
    
    try {
        const aiResponse = await openai.createImage({
          prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'b64_json',
        });
    
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
      } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
      }
}
export default handler;