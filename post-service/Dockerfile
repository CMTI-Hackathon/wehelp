FROM mongodb/mongo-cxx-driver

WORKDIR /build
RUN microdnf upgrade -y && microdnf install -y g++ cmake
COPY src /build/
RUN cmake build ./src CMAKE_RUNTIME_OUTPUT_DIRECTORY=./build
CMD [ "./program" ]