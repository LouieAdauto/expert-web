"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { MapPin, Briefcase } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import GoogleAd from "@/components/GoogleAd";
import { SEARCH_PROFILES } from "@/apollo/queries";



function ResultSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-5 shadow-sm space-y-3">
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

  const { data, loading, error } = useQuery(SEARCH_PROFILES, {
    variables: { searchTerm: query },
    skip: !query,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">
      {/* Left column – App promo */}
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky top-20 rounded-2xl bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg text-[#a85d00]">
            Instala la app de Expert
          </h2>
          <p className="text-sm text-gray-600">
            Encuentra expertos más rápido, chatea directo y recibe
            recomendaciones personalizadas.
          </p>
          <img alt="app-devices" src="/assets/images/app-devices.png"></img>
          <img alt="app-qr" src="/assets/images/app-qr.png" />
          <button className="w-full rounded-xl bg-[#FF9500] text-white py-2 hover:bg-[#ea9343] transition">
            Haz click aquí o escanea el QR
          </button>
        </div>
      </aside>

      {/* Center column – Results */}
      <section className="col-span-12 md:col-span-6 space-y-4">
        <h1 className="text-xl font-semibold text-[#a85d00]">
          Resultados para `${query}`
          {data?.searchProfiles && (
            <span className="text-gray-400 font-normal">
              {" "}
              ({data.searchProfiles.length})
            </span>
          )}
        </h1>

        {loading && (
          <>
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

        {data?.searchProfiles?.map((profile: any) => (
          <div
            key={profile.id}
            className="relative rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800"
          >
            {/* Badge destacado */}
            {profile.rating >= 4.5 && (
              <span className="absolute top-4 right-4 rounded-full bg-orange-100 text-[#a85d00] text-xs px-3 py-1 font-medium flex items-center gap-1">
                ⭐ Destacado
              </span>
            )}

            <div className="flex items-center gap-5">
              {/* Imagen */}
              <img
                src={profile.image || "/avatar-placeholder.png"}
                alt={profile.name}
                className="h-20 w-20 rounded-2xl object-cover flex-shrink-0"
              />

              {/* Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {profile.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {profile.position} · {profile.yoe} años exp.
                </p>

                <div className="flex items-center gap-2">
                  <RatingStars rating={profile.rating} />
                  <span className="text-sm text-gray-500">
                    {profile.rating.toFixed(1)} ({profile.reviewsCount ?? 0}{" "}
                    reseñas)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>
                    {profile.municipality} · {profile.countries?.[0]?.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-base text-gray-700">
                  <Briefcase size={16} />
                  <span>
                    Desde{" "}
                    <strong className="text-[#a85d00]">
                      ${profile.avgPrice ?? 500} MXN
                    </strong>{" "}
                    / trabajo
                  </span>
                </div>
              </div>

              {/* CTA alineado al último renglón */}
              <div className="ml-auto self-end">
                <button
                  onClick={() => setOpenProfile(profile)}
                  className="rounded-full bg-[#FF9500] px-7 py-3 text-base font-medium text-white hover:bg-[#ea9343] transition"
                >
                  Contratar
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Right column – Ads */}
      <aside className="col-span-12 md:col-span-3 space-y-4">
        {/* Ad 1 – interno */}
        <div className="sticky top-20 ">
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

          {/* Google Ads */}
          <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
            <GoogleAd />
          </div>

          <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
            <GoogleAd />
          </div>
        </div>
      </aside>
      {openProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in">
            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-900">
              Contactar a {openProfile.name}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Envía tu información de contacto a este experto para que se ponga
              en contacto contigo.
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Si deseas chatear directamente con este experto crea una cuenta,
              es fácil y rápido.
            </p>

            {/* Form */}
            <form className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              />

              <input
                type="tel"
                placeholder="Número de teléfono"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#FF9500] py-2 text-sm font-medium text-white hover:bg-[#ea9343] transition"
              >
                Enviar información
              </button>
            </form>

            {/* Footer */}
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
