export const handleScrollAnimation = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  document.querySelectorAll('.scroll-fade-in').forEach((element) => {
    observer.observe(element);
  });
};
