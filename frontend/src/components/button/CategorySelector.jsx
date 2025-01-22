import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

const categories = [
    { id: 1, name: "학과", value: "학과" },
    { id: 2, name: "총학", value: "총학" },
];

export default function CategorySelector({ category, setCategory }) {
    const selectedCategory = categories.find((c) => c.value === category) || {
        name: "카테고리를 선택하세요",
    };

    return (
        <div className="mb-6">
            <Listbox value={category} onChange={setCategory}>
                <Listbox.Label className="block text-sm font-medium text-gray-700">
                    카테고리 선택
                </Listbox.Label>
                <div className="relative mt-2">
                    <Listbox.Button className="w-60 cursor-default rounded-lg bg-white py-2 pl-3 pr-8 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm">
                        <span className="block truncate">
                            {selectedCategory.name}
                        </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-60 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {categories.map((cat) => (
                            <Listbox.Option
                                key={cat.id}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                                    }`
                                }
                                value={cat.value}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected ? "font-medium" : "font-normal"
                                            }`}
                                        >
                                            {cat.name}
                                        </span>
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );
}