"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  CircleDollarSign,
  ArrowBigRight,
  ArrowRightCircleIcon,
} from "lucide-react";
import RatingStars from "@/components/RatingStars";
import GoogleAd from "@/components/GoogleAd";
import { SEARCH_PROFILES } from "@/apollo/queries";
import { FiltersModal } from "./FiltersModal";
import { price_rates_array, price_rates_map } from "@/enums/price_rates";
import { Profile, Skill } from "@/types/types";
import { ProfileModal } from "./ProfileModal";

function ResultSkeleton() {
  return (
    <div className="animate-pulse dark:bg-gray-700 bg-white p-5 shadow-sm space-y-3 h-53">
      <div className="h-4 bg-orange-100 rounded w-1/3" />
      <div className="h-3 bg-orange-100 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-orange-100 rounded-full" />
        <div className="h-6 w-16 bg-orange-100 rounded-full" />
        <div className="h-6 w-16 bg-orange-100 rounded-full" />
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const params = useSearchParams();
  const query = params.get("query") ?? "";
  const [openProfile, setOpenProfile] = React.useState<any>(null);
  const [openProfileId, setOpenProfileId] = React.useState<string | null>(null);

  const { data, loading, error } = useQuery(SEARCH_PROFILES, {
    variables: { searchTerm: query },
    skip: !query,
  });

  console.log(data?.searchProfiles);
  console.log(error);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
      {/* LEFT – App promo (hidden on mobile) */}
      <aside className="hidden md:block md:col-span-3 ">
        <div className="sticky top-20 rounded-2xl bg-white p-5 shadow-sm space-y-4 dark:bg-gray-800 ">
          <h2 className="font-semibold text-lg text-[#a85d00] dark:text-[#fa9943] ">
            Instala la app de Expert
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Encuentra expertos más rápido, chatea directo y recibe
            recomendaciones personalizadas.
          </p>
          <img
            alt="app-devices"
            src="/assets/images/app-devices.png"
            className="w-full"
          />
          <img
            alt="app-qr"
            src="/assets/images/app-qr.png"
            className="w-full"
          />
          <button className="w-full rounded-xl bg-[#FF9500] text-white py-2 hover:bg-[#ea9343] transition">
            Haz click aquí o escanea el QR
          </button>
        </div>
      </aside>

      {/* CENTER – Results */}
      <section className="col-span-12 md:col-span-6 space-y-4">
        <div className="flex row">
          <h1 className="space-between text-xl font-semibold text-[#a85d00] dark:text-[#fa9943]">
            Resultados
            {data?.searchProfiles && (
              <span className="text-gray-400 font-normal">
                {" "}
                ({data.searchProfiles.length})
              </span>
            )}
          </h1>
          <div className="float-right">
            <FiltersModal />
          </div>
        </div>

        {loading && (
          <>
            <ResultSkeleton />
            <ResultSkeleton />
            <ResultSkeleton />
            <ResultSkeleton />
            <ResultSkeleton />
          </>
        )}

        {error && (
          <p className="text-red-500">Ocurrió un error al buscar resultados.</p>
        )}

        {!loading && data?.searchProfiles?.length === 0 && (
          <p className="text-gray-500">No se encontraron resultados.</p>
        )}

        {data?.searchProfiles?.map(
          (
            profile: Profile & {
              reviewsUsingReviews_reviewer_id_fkey: any;
              skill: Skill;
            },
          ) => (
            <div
              key={profile.id}
              onClick={() => setOpenProfileId(profile.id)}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 relative bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700"
            >
              {/* Badge destacado */}
              {profile.rating >= 4.5 && (
                <span className="absolute top-4 right-4 rounded-full bg-orange-100 text-[#a85d00] text-xs px-3 py-1 font-medium flex items-center gap-1">
                  ⭐ Destacado
                </span>
              )}

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                {/* Avatar */}
                <img
                  src={profile.image || "/assets/images/avatar.png"}
                  alt={profile.name}
                  className="h-20 w-20 rounded-2xl object-cover mx-auto sm:mx-0 flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="capitalize text-lg font-semibold dark:text-white text-gray-900">
                    {profile.name}
                  </h3>

                  <p className="text-sm dark:text-white text-gray-600">
                    {profile.skill.name} · {profile.yoe} años de experiencia.
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <RatingStars rating={profile.rating} />
                    <span className="text-sm text-gray-500">
                      (
                      {profile.reviewsUsingReviews_reviewer_id_fkey.length ?? 0}{" "}
                      reseñas)
                    </span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm dark:text-gray-400 text-gray-600">
                    <MapPin size={16} className="dark:text-white" />
                    <span>
                      {profile.municipality} · {profile.countries?.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-700">
                    {[...Array(profile.price_rate)].map((_: number, i) => (
                      <CircleDollarSign key={i} size={16} color="lightgreen" />
                    ))}

                    <span className="dark:text-gray-400">
                      {`Costo ${price_rates_array[profile.price_rate - 1]} por evento`}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="self-stretch sm:self-end">
                  <button
                    onClick={() => setOpenProfile(profile)}
                    className="flex gap-2 cursor-pointer row w-full sm:w-auto rounded-full bg-[#FF9500] px-3 py-3 text-base font-medium text-white hover:bg-[#ea9343] transition"
                  >
                    <ArrowRightCircleIcon />
                    Contratar
                  </button>
                </div>
              </div>
            </div>
          ),
        )}
      </section>

      {/* RIGHT – Ads (hidden on mobile) */}
      <aside className="hidden md:block md:col-span-3 space-y-4">
        <div className="sticky top-20 space-y-5">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <span className="text-[10px] tracking-wide text-gray-400 uppercase">
              Anuncio
            </span>
            <h4 className="font-semibold text-sm text-[#a85d00]">
              Contrata expertos verificados
            </h4>
            <p className="text-xs text-gray-600">
              Talento especializado para tus proyectos en minutos.
            </p>
            <a href="#" className="text-xs text-[#FF9500] hover:underline">
              www.empresas-expert.com
            </a>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <GoogleAd />
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <GoogleAd />
          </div>
        </div>
        {openProfileId && (
          <ProfileModal
            profileId={openProfileId}
            onClose={() => setOpenProfileId(null)}
          />
        )}
      </aside>

      {/* MODAL */}
      {openProfile && (
        <div className="transition-all fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Contactar a {openProfile.name}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Envía tu información de contacto a este experto para que se ponga
              en contacto contigo.
            </p>

            <form className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
              <input
                type="tel"
                placeholder="Número de teléfono"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
              <button className="w-full rounded-xl bg-[#FF9500] py-2 text-sm font-medium text-white hover:bg-[#ea9343] transition">
                Enviar información
              </button>
            </form>

            <button
              onClick={() => setOpenProfile(null)}
              className="mt-4 w-full text-xs text-gray-500 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
