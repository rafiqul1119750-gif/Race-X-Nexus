// Isme teenon cards ab sahi file paths par point kar rahe hain
<div className="grid grid-cols-1 gap-6">
  <MagicCard 
    title="Neural Chat" 
    desc="Gemini-Powered AI Intelligence"
    icon={<MessageSquare size={32}/>}
    color="from-blue-600 to-purple-600"
    // Screenshot 12:36 ke mutabiq path
    onClick={() => setLocation("/magic/ai-chat")} 
  />
  <MagicCard 
    title="Dream Canvas" 
    desc="Text to Photorealistic Art"
    icon={<ImageIcon size={32}/>}
    color="from-purple-600 to-pink-600"
    // Screenshot 12:36 ke mutabiq path
    onClick={() => setLocation("/magic/image-gen")}
  />
  <MagicCard 
    title="Magic Wand" 
    desc="Upscale & Enhance Everything"
    icon={<Wand2 size={32}/>}
    color="from-pink-600 to-orange-600"
    // Ye Studio Hub par le jayega
    onClick={() => setLocation("/studio")} 
  />
</div>
