"use client";

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { X, Star, Briefcase } from "lucide-react";
import { QUERY_FULL_USER } from "@/apollo/queries";
import RatingStars from "@/components/RatingStars";
import Portal from "./Portal";

interface Props {
  profileId: string;
  onClose: () => void;
}

function ProfileModalSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-56 bg-gray-200 dark:bg-gray-800" />

      <div className="pt-20 px-6 space-y-4">
        <div className="mx-auto h-32 w-32 rounded-full bg-gray-300 dark:bg-gray-700 -mt-24" />

        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto" />

        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>

        <div className="space-y-3">
          <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl" />
          <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProfileModal({ profileId, onClose }: Props) {
  const { data, loading } = useQuery(QUERY_FULL_USER, {
    variables: { id: profileId },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // cerrar con ESC
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  //if (!data && loading) return null;

  const profile = data?.profile;

  if (loading) {
    return (
      <Portal>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-gray-900 overflow-hidden">
            <ProfileModalSkeleton />
          </div>
        </div>
      </Portal>
    );
  }

  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        onClick={onClose}
      >
        {/* MODAL */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            relative w-full md:max-w-3xl
            min-h-screen md:min-h-0
            bg-white dark:bg-gray-900
            overflow-hidden
            rounded-none md:rounded-3xl
            shadow-xl
            animate-in fade-in slide-in-from-bottom md:zoom-in
            duration-200
        "
        >
          {/* COVER */}
          <div className="relative h-40">
            <img
              alt="cover"
              src={profile.backimage || "/assets/images/cover-placeholder.jpg"}
              className="h-full w-full object-cover"
            />

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="fixed md:absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white"
            >
              <X size={18} />
            </button>

            {/* AVATAR */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <img
                alt="image"
                src={profile.image || "/assets/images/avatar.png"}
                className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-900 object-cover"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="pt-16 px-6 pb-6 space-y-6">
            {/* HEADER */}
            <div className="text-center">
              <h2 className="text-xl font-semibold dark:text-white">
                {profile.name}
              </h2>
              <p className="text-sm text-gray-500">{profile.position}</p>

              <div className="mt-2 flex justify-center gap-2">
                <RatingStars rating={profile.rating} />
              </div>
            </div>

            {/* ABOUT */}
            {profile.about && (
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {profile.about}
              </p>
            )}

            {/* EXPERIENCE */}
            <div className="flex row gap-2">
              {profile.experience.length > 0 && (
                <div className="flex-1">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-500">
                    <Briefcase size={16} />
                    Experiencia
                  </h3>

                  <div className="space-y-2">
                    {profile.experience.map((exp: any) => (
                      <div
                        key={exp.id}
                        className="dark:bg-gray-800 flex items-center gap-3 rounded-xl border border-gray-100 dark:border-gray-800 p-3"
                      >
                        <img
                          alt="company"
                          src={
                            exp?.companyimage || "/assets/images/briefcase.webp"
                          }
                          alt="briefcase"
                          className="h-8 w-8 rounded object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium dark:text-white">
                            {exp.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {exp.companyname}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REVIEWS */}
              {profile.reviewsUsingReviews_reviewee_id_fkey.length > 0 && (
                <div className="flex-1">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-500">
                    <Star size={16} />
                    Reseñas
                  </h3>

                  <div className="space-y-3">
                    {profile.reviewsUsingReviews_reviewee_id_fkey.map(
                      (review: any) => (
                        <div
                          key={review.id}
                          className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              alt="reviewer"
                              src={
                                review.profileUsingReviews_reviewer_id_fkey
                                  .image
                              }
                              className="h-8 w-8 rounded-full"
                            />
                            <p className="text-sm font-medium dark:text-white">
                              {review.profileUsingReviews_reviewer_id_fkey.name}
                            </p>
                          </div>

                          <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                            {review.comments}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
