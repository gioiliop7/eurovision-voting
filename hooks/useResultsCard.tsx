"use client";

// Custom hook for generating results card
import { useRef, useCallback } from "react";
import type { Country } from "@/types";
import { toast } from "@/hooks/use-toast";

export function useResultsCard(
  sortedCountries: Country[],
  votes: Record<string, number>
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generateResultCard = useCallback(() => {
    if (!canvasRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = 1280;
    canvas.height = 720;

    // Draw background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#7c3aed");
    gradient.addColorStop(1, "#c026d3");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 60px Poppins";
    ctx.textAlign = "center";
    ctx.fillText("My Eurovision 2025 Votes", canvas.width / 2, 100);

    const top3 = sortedCountries.slice(0, 3);

    // 🟡 Load all flag images as base64
    const loadFlag = (iso: string): Promise<HTMLImageElement> => {
      const flagUrl = `https://flagcdn.com/w80/${iso}.png`;
      return fetch(flagUrl)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64 = reader.result as string;
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = base64;
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );
    };

    // 🟢 Wait for all images to load before drawing
    return Promise.all(top3.map((c) => loadFlag(c.iso ? c.iso : "")))
      .then((images) => {
        top3.forEach((country, index) => {
          const x = canvas.width / 2 + (index - 1) * 250;
          const y = 300;

          const img = images[index];
          const flagWidth = 80;
          const flagHeight = 60;
          ctx.drawImage(
            img,
            x - 40,
            y - flagHeight - 20,
            flagWidth,
            flagHeight
          );

          // Draw country name
          ctx.font = "bold 30px Poppins";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(country.name, x, y + 80);

          // Draw points
          ctx.font = "bold 50px Poppins";
          ctx.fillText(`${votes[country.id] || 0} pts`, x, y + 140);

          // Draw position
          ctx.fillStyle =
            index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : "#cd7f32";
          ctx.beginPath();
          ctx.arc(x, y - 140, 40, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#000000";
          ctx.font = "bold 40px Poppins";
          ctx.fillText(`${index + 1}`, x, y - 125);
        });

        // Draw footer
        ctx.fillStyle = "#ffffff";
        ctx.font = "24px Poppins";
        ctx.fillText(
          "Created with Eurovision Voting App",
          canvas.width / 2,
          canvas.height - 50
        );

        return canvas.toDataURL("image/png");
      })
      .catch((err) => {
        console.error("Failed to load images or draw canvas", err);
        return null;
      });
  }, [sortedCountries, votes]);

  const downloadResultCard = useCallback(async () => {
    const dataUrl = await generateResultCard();
    if (dataUrl) {
      const link = document.createElement("a");
      link.download = "eurovision-votes.png";
      link.href = dataUrl;
      link.click();

      toast({
        title: "Image Downloaded",
        description: "Your results card has been downloaded.",
        duration: 3000,
      });
    }
  }, [generateResultCard]);

  return {
    canvasRef,
    generateResultCard,
    downloadResultCard,
  };
}
