const melbourneSuburbs = [
  'Alphington',
  'Fitzroy North',
  'Northcote',
  'Thornbury',
  'Preston',
  'Heidelberg',
  'Ivanhoe',
  'Kew',
  'Hawthorn',
  'Richmond',
  'Collingwood',
  'Brunswick',
  'Carlton',
  'Doncaster',
  'Templestowe',
  'Box Hill',
  'Balwyn',
  'Camberwell',
  'Glen Waverley',
  'Oakleigh',
  'South Yarra',
  'St Kilda',
  'Prahran',
  'Malvern',
  'Caulfield',
  'Essendon',
  'Moonee Ponds',
  'Coburg',
  'Reservoir',
  'Bundoora',
  'Greensborough',
  'Diamond Creek',
  'Eltham',
  'Ringwood',
  'Croydon',
  'Mitcham',
  'Nunawading',
] as const;

export default function ServiceAreaList() {
  return (
    <section className="py-16 bg-slate-50" aria-labelledby="service-areas-heading">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 id="service-areas-heading" className="font-heading text-3xl md:text-4xl text-slate-900 mb-3">
            Areas We Service
          </h2>
          <p className="text-slate-600">Based in Alphington, we work across Melbourne and surrounding suburbs.</p>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2" aria-label="Service areas">
          {melbourneSuburbs.map((suburb) => (
            <li
              key={suburb}
              className="flex items-center gap-1.5 text-sm text-slate-700 bg-white rounded-lg px-3 py-2 shadow-xs border border-slate-100"
            >
              <svg
                className="w-3 h-3 text-jlc-blue flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {suburb}
            </li>
          ))}
        </ul>
        <p className="text-center text-slate-500 text-sm mt-6">
          Not on the list? Get in touch and we will let you know if we cover your area.
        </p>
      </div>
    </section>
  );
}
