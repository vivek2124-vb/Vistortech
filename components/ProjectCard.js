import Link from "next/link";

const CATEGORY_LABELS = {
  "web-development": "Web Development",
  "app-development": "App Development",
  "digital-marketing": "Digital Marketing",
  "ecommerce-website": "E-commerce",
};

export default function ProjectCard({ project }) {
  const cover = project.images?.[0];

  return (
    <Link href={`/portfolio/${project._id}`} className="group block">
      <div className="aspect-[4/3] rounded-xl bg-slate/10 overflow-hidden">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={project.title}
            /* 
              FIXED CLASSES:
              1. object-top: Anchors the image to the top so the website header is visible.
              2. group-hover:object-bottom: Scrolls to the footer when hovered.
              3. duration-[4000ms]: Makes the scroll take 4 seconds so it's smooth.
            */
            className="h-full w-full object-cover object-top group-hover:object-bottom transition-all duration-[4000ms] ease-in-out"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate/40 text-sm">
            No image
          </div>
        )}
      </div>

      <p className="mt-3 text-xs font-medium text-sky uppercase tracking-wide">
        {CATEGORY_LABELS[project.category] || project.category}
      </p>

      <h3 className="font-display font-semibold text-ink group-hover:text-sky transition-colors">
        {project.title}
      </h3>
    </Link>
  );
}
