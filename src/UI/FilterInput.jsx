import { FaCediSign } from "react-icons/fa6";
import "./filterWindow.css";
export default function FilterInput({
  type,
  field,
  title,
  name,
  isCurrency = true,
  onChange,
}) {
  return (
    <div className="flex ">
      <div className="flex flex-col items-center rounded bg-slate-300 px-2">
        <span className="opacity-60">{title}</span>

        <div className="flex items-center">
          {isCurrency && (
            <span className="flex items-center opacity-60  ">
              GH
              <FaCediSign />
            </span>
          )}
          <input
            onChange={(e) => onChange(e, type, field)}
            className="no-spinner w-32 bg-slate-300 p-1 text-xl outline-none "
            type="number"
            autoFocus={true}
            name={name}
          />
          {isCurrency && <span className="opacity-60">/year</span>}
        </div>
      </div>
    </div>
  );
}
