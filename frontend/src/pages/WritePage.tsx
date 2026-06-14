import WriteForm from "@/components/write/WriteForm";

const WritePage = () => {
  return (
    <div className="px-5 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-[#2A2A3E] bg-[#12121A] p-6">
          <WriteForm />
        </div>
      </div>
    </div>
  );
};

export default WritePage;