"use client";

import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

export const SEARCH_PROFILES = gql`
  query SearchProfiles($searchTerm: String!) {
    searchProfiles(searchTerm: $searchTerm) {
      id
      name
      image
      position
      rating
      yoe
      municipality
      alias
      skill {
        id
        name
        description
      }
      countries {
        name
      }
    }
  }
`;

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

  const { data, loading, error } = useQuery(SEARCH_PROFILES, {
    variables: { searchTerm: query },
    skip: !query,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">
      {/* Left column – App promo */}
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky top-28 rounded-2xl bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg text-[#a85d00]">
            Instala la app de Expert
          </h2>
          <p className="text-sm text-gray-600">
            Encuentra expertos más rápido, chatea directo y recibe
            recomendaciones personalizadas.
          </p>
          <button className="w-full rounded-xl bg-[#FF9500] text-white py-2 hover:bg-[#ea9343] transition">
            Descargar app
          </button>
        </div>
      </aside>

      {/* Center column – Results */}
      <section className="col-span-12 md:col-span-6 space-y-4">
        <h1 className="text-xl font-semibold text-[#a85d00]">
          Resultados para "{query}"{data?.searchProfiles && (
            <span className="text-gray-400 font-normal">
              {" "}({data.searchProfiles.length})
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
            className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start gap-4">
              <img
                src={profile.image || "/avatar-placeholder.png"}
                alt={profile.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-sm text-gray-600">
                  {profile.position} · {profile.yoe} años exp.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {/* {profile.skill?.map((s: any) => (
                    <span
                      key={s.id}
                      className="text-xs bg-orange-50 text-[#a85d00] px-3 py-1 rounded-full"
                    >
                      {s.name}
                    </span>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Right column – Ads */}
      <aside className="col-span-12 md:col-span-3 space-y-4">
        {[1, 2, 3].map((ad) => (
          <div
            key={ad}
            className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition"
          >
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
        ))}
      </aside>
    </div>
  );
}
