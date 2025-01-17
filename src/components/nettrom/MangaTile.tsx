"use client";

import Link from "next/link";
import { useState } from "react";
import { ExtendChapter } from "@/types/mangadex";
import { Constants } from "@/constants";
import { Utils } from "@/utils";
import { MangaHoverCard } from "@/components/nettrom/MangaHoverCard";
import { ReadingHistory } from "@/types";
import { useMangadex } from "@/contexts/mangadex";

interface MangaTileProps {
  id: string;
  title: string;
  thumbnail: string;
  chapters: ExtendChapter[];
  readedChapters: ReadingHistory;
}

export const MangaTile: React.FC<MangaTileProps> = ({
  id,
  title,
  thumbnail,
  chapters,
  readedChapters,
}) => {
  const { mangaStatistics } = useMangadex();
  const readedChaptersId = readedChapters?.chapterId ?? null;
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="group">
      <figure className="clearfix">
        <div className="relative mb-2">
          <MangaHoverCard
            id={id}
            title={title}
            thumbnail={thumbnail}
            chapters={chapters}
            readedChaptersId={readedChaptersId}
            showFullDescription={showFullDescription}
            setShowFullDescription={setShowFullDescription}
          />
          <div className="absolute bottom-0 left-0 z-[2] w-full px-2 py-1.5">
            <h3 className="mb-2 line-clamp-2 text-[14px] font-semibold leading-tight text-white transition group-hover:line-clamp-4">
              {title}
            </h3>
            <span className="flex items-center justify-between gap-[4px] text-[11px] text-muted-foreground">
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-star"></i>
                {Utils.Number.formatViews(
                  Math.round(
                    (mangaStatistics[id]?.rating?.bayesian || 0) * 10,
                  ) / 10,
                )}
              </span>
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-comment" />
                {Utils.Number.formatViews(
                  mangaStatistics[id]?.comments?.repliesCount || 0,
                )}
              </span>
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-heart" />
                {Utils.Number.formatViews(mangaStatistics[id]?.follows || 0)}
              </span>
            </span>
          </div>
        </div>
        <figcaption>
          <ul className="flex flex-col gap-[4px]">
            {chapters.slice(0, 3).map((chapter) => (
              <li
                className="flex items-center justify-between gap-x-2 text-[12px]"
                key={chapter.id}
              >
                <Link
                  href={Constants.Routes.nettrom.chapter(chapter.id)}
                  title={Utils.Mangadex.getChapterTitle(chapter)}
                  className={
                    readedChaptersId === chapter.id
                      ? "flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-web-titleDisabled transition hover:text-web-titleLighter"
                      : "flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-web-title transition hover:text-web-titleLighter"
                  }
                >
                  {Utils.Mangadex.getChapterTitle(chapter)}
                </Link>
                <span className="whitespace-nowrap text-base leading-[13px] text-muted-foreground">
                  {Utils.Date.formatNowDistance(
                    new Date(chapter.attributes.readableAt),
                  )
                    .replace("khoảng", "")
                    .replace("vài", "")
                    .trim() + " trước"}
                </span>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </div>
  );
};
