"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Wand2,
  Loader2,
  Share2,
  Music2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@crossmint/client-sdk-react-ui";

export default function CreatePost() {
  const { logout } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<"matcha" | "alice">("matcha");

  // Example music content - this would come from your data/props
  const musicContent = {
    type: "Track",
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    albumArt: "/cover-image.png",
    duration: "3:45",
    releaseDate: "2024",
  };

  const handleGenerate = async (value: "matcha" | "alice") => {
    setIsGenerating(true);
    // Simulate AI generation - replace with actual AI integration
    // setTimeout(() => {
    //   setGeneratedImage("/generated-image.png");
    //   setIsGenerating(false);
    // }, 2000);
    let selectedData;

    const matchaData = {
      version:
        "00430f0bd52a14f794e379250e0619c3ea882588ad118162e6e2f4391042329d",
      input: {
        model: "dev",
        prompt: prompt,
        go_fast: false,
        lora_scale: 1,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "webp",
        guidance_scale: 3,
        output_quality: 80,
        prompt_strength: 0.8,
        extra_lora_scale: 1,
        num_inference_steps: 20,
      },
    };

    const aliceData = {
      version:
        "5a8f8fc1c97856135e339666ca8edcf8e3fde73a57cba4c236525a175fca7544",
      input: {
        model: "dev",
        prompt: prompt,
        go_fast: false,
        lora_scale: 1,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "webp",
        guidance_scale: 3,
        output_quality: 80,
        prompt_strength: 0.8,
        extra_lora_scale: 1,
        num_inference_steps: 20,
      },
    };

    if (value === "matcha") {
      selectedData = matchaData;
    } else {
      selectedData = aliceData;
    }

    try {
      const res = await fetch("/api/replicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedData),
      });

      const result = await res.json();
      console.log("result", result);
      setGeneratedImage(result.output[0]);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleShare = (platform: string) => {
    // Implement sharing logic for each platform
    console.log(`Sharing to ${platform}`);
  };

  return (
    <div
      className="min-h-screen bg-background"
      style={{ backgroundImage: "url('/gradient-background.jpg')" }}
    >
      <div className="container px-4 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Music Content Information */}
          <Card className="mb-8 p-6 bg-transparent">
            <div className="flex items-start gap-4">
              <div className="relative h-[150px] w-[150px] flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={musicContent.albumArt || "/placeholder.svg"}
                  alt={`${musicContent.title} cover`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-transparent border border-white px-2 py-1 text-xs font-medium text-white">
                    {musicContent.type}
                  </span>
                  <span className="text-sm text-white">
                    {musicContent.duration}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {musicContent.title}
                </h2>
                <div className="flex items-center gap-2">
                  <Music2 className="h-4 w-4 text-white" />
                  <span className="text-lg text-white">
                    {musicContent.artist}
                  </span>
                </div>
                <p className="text-sm text-white">
                  Released: {musicContent.releaseDate}
                </p>
              </div>
            </div>
          </Card>

          <Separator className="my-8" />

          <h1 className="mb-8 text-3xl font-bold text-primary-500">
            Create Your Music Meme
          </h1>
          <p className="text-white mb-2">Active modal: {activeData}</p>
          <div className="mb-5">
            <Button
              onClick={() => setActiveData("matcha")}
              className="border border-white mr-2"
            >
              Matcha model
            </Button>
            <Button
              onClick={() => setActiveData("alice")}
              className="border border-white"
            >
              Alice model
            </Button>
          </div>

          {/* Prompt Input */}
          <Card className="mb-6 p-4 bg-transparent">
            <Textarea
              placeholder="Describe your music meme idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-4 min-h-[100px] resize-none bg-white"
            />
            <Button
              onClick={() => handleGenerate(activeData)}
              disabled={!prompt || isGenerating}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Imagine a music meme
                </>
              )}
            </Button>
          </Card>

          {/* Generated Image Display */}
          {generatedImage && (
            <Card className="mb-6 overflow-hidden">
              <div className="aspect-square">
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt="Generated meme"
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>
          )}

          {/* Share Buttons */}
          {generatedImage && (
            <div className="rounded-lg border bg-gradient p-4">
              <div className="mb-2 flex items-center">
                <Share2 className="mr-2 h-5 w-5 text-white" />
                <span className="font-semibold text-white">
                  Share it to earn 5 tokens
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12"
                        onClick={() => handleShare("facebook")}
                      >
                        <Facebook className="h-5 w-5 text-white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share on Facebook</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12"
                        onClick={() => handleShare("twitter")}
                      >
                        <Twitter className="h-5 w-5 text-white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share on Twitter</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12"
                        onClick={() => handleShare("instagram")}
                      >
                        <Instagram className="h-5 w-5 text-white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share on Instagram</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12"
                        onClick={() => handleShare("linkedin")}
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share on LinkedIn</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}

          <Separator className="my-8" />

          <Button
            size="lg"
            className="w-full text-lg text-black bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
