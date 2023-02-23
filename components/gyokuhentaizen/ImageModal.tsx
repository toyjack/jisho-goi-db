import Image from "next/image";

function GyokuhentaizenImageModal({
  modalId,
  title,
  imageUrl,
}: {
  modalId: string;
  title: string;
  imageUrl: string;
}) {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="modal cursor-pointer">
        <label className="modal-box w-11/12 max-w-5xl h-5/6" htmlFor="">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="py-4">
            <Image
              src={imageUrl}
              alt="waseda"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </p>
        </label>
      </label>
    </>
  );
}

export default GyokuhentaizenImageModal;
