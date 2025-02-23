"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  PlusCircle,
  MinusCircle,
  Upload,
  Music2,
  Radio,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TokenCreator from "../components/token-creator";

type SocialLink = {
  platform: string;
  url: string;
};

type ContentItem = {
  name: string;
  socialLinks: SocialLink[];
  images: string[];
};

export default function ArtistSetup() {
  const [mainImage, setMainImage] = useState<string>("");
  const [tracks, setTracks] = useState<ContentItem[]>([
    { name: "", socialLinks: [], images: [] },
  ]);
  const [sets, setSets] = useState<ContentItem[]>([
    { name: "", socialLinks: [], images: [] },
  ]);
  const [shows, setShows] = useState<ContentItem[]>([
    { name: "", socialLinks: [], images: [] },
  ]);

  const handleAddSocialLink = (
    contentType: "tracks" | "sets" | "shows",
    contentIndex: number
  ) => {
    const updater =
      contentType === "tracks"
        ? setTracks
        : contentType === "sets"
        ? setSets
        : setShows;
    const content =
      contentType === "tracks" ? tracks : contentType === "sets" ? sets : shows;

    const newContent = [...content];
    newContent[contentIndex].socialLinks.push({ platform: "", url: "" });
    updater(newContent);
  };

  const handleRemoveSocialLink = (
    contentType: "tracks" | "sets" | "shows",
    contentIndex: number,
    linkIndex: number
  ) => {
    const updater =
      contentType === "tracks"
        ? setTracks
        : contentType === "sets"
        ? setSets
        : setShows;
    const content =
      contentType === "tracks" ? tracks : contentType === "sets" ? sets : shows;

    const newContent = [...content];
    newContent[contentIndex].socialLinks.splice(linkIndex, 1);
    updater(newContent);
  };

  const renderContentSection = (
    title: string,
    icon: React.ReactNode,
    items: ContentItem[],
    setItems: React.Dispatch<React.SetStateAction<ContentItem[]>>,
    contentType: "tracks" | "sets" | "shows"
  ) => (
    <Card className="mb-6 bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.map((item, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label className="text-white">Name</Label>
                <Input
                  placeholder={`Enter ${title.toLowerCase()} name`}
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].name = e.target.value;
                    setItems(newItems);
                  }}
                />
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                <Label className="text-white">Social Links</Label>
                {item.socialLinks.map((link, linkIndex) => (
                  <div key={linkIndex} className="flex gap-2">
                    <Select
                      value={link.platform}
                      onValueChange={(value) => {
                        const newItems = [...items];
                        newItems[index].socialLinks[linkIndex].platform = value;
                        setItems(newItems);
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soundcloud">SoundCloud</SelectItem>
                        <SelectItem value="spotify">Spotify</SelectItem>
                        <SelectItem value="bandcamp">Bandcamp</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Enter URL"
                      value={link.url}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].socialLinks[linkIndex].url =
                          e.target.value;
                        setItems(newItems);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleRemoveSocialLink(contentType, index, linkIndex)
                      }
                    >
                      <MinusCircle className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-white"
                  onClick={() => handleAddSocialLink(contentType, index)}
                >
                  <PlusCircle className="mr-2 h-4 w-4 text-white" />
                  Add Link
                </Button>
              </div>

              {/* Images */}
              <div className="space-y-2">
                <Label>Images (3-6)</Label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[...Array(6)].map((_, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 p-2"
                    >
                      {item.images[imgIndex] ? (
                        <img
                          src={item.images[imgIndex] || "/placeholder.svg"}
                          alt={`${title} ${imgIndex + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Upload className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {index < items.length - 1 && <Separator className="my-6" />}
          </div>
        ))}
        <Button
          variant="outline"
          className="mt-4 w-full text-white"
          onClick={() =>
            setItems([...items, { name: "", socialLinks: [], images: [] }])
          }
        >
          <PlusCircle className="mr-2 h-4 w-4 text-white" />
          Add Another {title.slice(0, -1)}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: "url('/gradient-background.jpg')" }}
    >
      <div className="container max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-primary-500">
          Set Up Your Artist Profile
        </h1>

        {/* Artist Details */}
        <Card className="mb-6 bg-transparent">
          <CardHeader>
            <CardTitle className="text-white">Artist Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="alias" className="text-white">
                Artist Alias
              </Label>
              <Input id="alias" placeholder="Enter your artist alias" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tokenName" className="text-white">
                Artist Token Name / Agent&apos;s Name
              </Label>
              <Input id="tokenName" placeholder="Enter token/agent name" />
            </div>

            <div className="grid gap-2">
              <Label className="text-white">Main Representative Image</Label>
              <div className="aspect-square w-full max-w-[300px] overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/25 flex justify-center items-center">
                {/* <img
                  src={mainImage || "/cover-image.png"}
                  alt="Main artist image"
                  className="h-full w-full object-cover"
                /> */}
                <Upload className="flex mr-2 h-6 w-6 text-white" />
              </div>
              <Button variant="outline" className="mt-2 w-fit text-white">
                <Upload className="mr-2 h-4 w-4 text-white" />
                Upload Image
              </Button>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself and your music..."
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <TokenCreator />
            </div>
          </CardContent>
        </Card>

        {/* Tracks */}
        {renderContentSection(
          "Tracks",
          <Music2 className="h-5 w-5" />,
          tracks,
          setTracks,
          "tracks"
        )}

        {/* Sets */}
        {renderContentSection(
          "Sets",
          <Radio className="h-5 w-5" />,
          sets,
          setSets,
          "sets"
        )}

        {/* Shows */}
        {renderContentSection(
          "Shows",
          <Calendar className="h-5 w-5" />,
          shows,
          setShows,
          "shows"
        )}

        {/* Submit Button */}
        <Button
          size="lg"
          className="mt-8 w-full text-black bg-gradient-to-r from-primary-500 to-primary-600"
        >
          Create Artist Profile
        </Button>
      </div>
    </div>
  );
}
