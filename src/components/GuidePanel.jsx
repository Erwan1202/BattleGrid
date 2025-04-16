export default function GuidePanel() {
    return (
      <div>
        <h3 className="text-lg font-bold mb-2">🧾 Guide</h3>
        <ul className="text-sm list-disc list-inside space-y-1">
          <li><b>spread x y</b> : coloniser une case</li>
          <li><b>build x y</b> : construire une ville</li>
          <li><b>status</b> : voir tes ressources</li>
          <li><b>end</b> : finir ton tour</li>
        </ul>
      </div>
    );
  }
  