export default function Footer() {
  return (
    <footer className="w-full py-3 bg-deepNavy text-white text-center shadow-inner mt-auto flex flex-col items-center gap-2">
      <div className="font-bold text-lg tracking-wide">Preventivas Giga+</div>
      <div className="text-sm">
        &copy; {new Date().getFullYear()} Todos os direitos reservados.
      </div>
      <div className="text-xs opacity-80">
        Desenvolvido por <a href="https://github.com/barbrete" className="underline hover:text-blue-300">Bárbara Gianvechio Cobo</a>
      </div>
    </footer>
  );
}
